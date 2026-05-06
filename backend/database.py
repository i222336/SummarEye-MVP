import os
import uuid
from datetime import datetime
from sqlalchemy import create_engine, Column, String, Float, Integer, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from sqlalchemy import event

# --- Database Configuration ---

# Check if running in a Google Cloud environment (like App Hosting or Cloud Run)
# The K_SERVICE environment variable is set in these environments.
if "K_SERVICE" in os.environ:
    # Production: Connect to Cloud SQL using environment variables for credentials
    db_user = os.environ.get("DB_USER", "")
    db_pass = os.environ.get("DB_PASS", "")
    db_name = os.environ.get("DB_NAME", "")
    # The instance connection name you provided. This will also be read from an env var.
    instance_connection_name = os.environ.get("DB_INSTANCE_CONNECTION_NAME", "")

    # Create the database URL for Cloud SQL with a Unix socket
    # This is the recommended and most secure way to connect from App Hosting
    DATABASE_URL = (
        f"mysql+mysqlconnector://{db_user}:{db_pass}@/{db_name}"
        f"?unix_socket=/cloudsql/{instance_connection_name}"
    )
    # The SQLAlchemy engine for Cloud SQL (no special connect_args needed)
    engine = create_engine(DATABASE_URL)

else:
    # Development: Use a local SQLite file for simplicity
    DATABASE_URL = "sqlite:///./sightline.db"
    # The SQLAlchemy engine for SQLite
    # connect_args is specific to SQLite to allow multi-threaded access
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


# --- Database Models (Schema) ---

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String(255), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_active_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    videos = relationship("Video", back_populates="user", cascade="all, delete-orphan")
    tracking_events = relationship("TrackingEvent", back_populates="user", cascade="all, delete-orphan")

class Video(Base):
    __tablename__ = "videos"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    filename = Column(String(255), nullable=False)
    filepath = Column(String(255), nullable=False)
    upload_time = Column(DateTime, default=datetime.utcnow)
    status = Column(String(50), default="pending") # 'pending', 'processing', 'done', 'error'
    duration_s = Column(Float, nullable=True)
    event_count = Column(Integer, default=0)
    error_msg = Column(String(1024), nullable=True)

    # Relationships
    events = relationship("Event", back_populates="video", cascade="all, delete-orphan")
    user = relationship("User", back_populates="videos")

class Event(Base):
    __tablename__ = "events"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    video_id = Column(String, ForeignKey("videos.id"), nullable=False)
    start_time = Column(Float, nullable=False)
    end_time = Column(Float, nullable=False)
    duration_s = Column(Float, nullable=False)
    label = Column(String(100), nullable=False) # 'person_detected' or 'loitering'
    confidence = Column(Float, nullable=False)
    clip_path = Column(String(255), nullable=True)
    thumbnail = Column(String(255), nullable=True)
    flagged = Column(Boolean, default=False)
    flag_reason = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    video = relationship("Video", back_populates="events")

@event.listens_for(Event, 'before_insert')
def auto_compute_duration(mapper, connection, target):
    if target.start_time is not None and target.end_time is not None:
        if target.duration_s is None:
            target.duration_s = float(target.end_time) - float(target.start_time)

class TrackingEvent(Base):
    __tablename__ = "tracking_events"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    event_name = Column(String(255), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    metadata_json = Column(String(2048), nullable=True) # JSON dump of metadata

    user = relationship("User", back_populates="tracking_events")


# --- Database Initialization and Session Management ---

def init_db():
    # This will create all the tables defined in the models
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
