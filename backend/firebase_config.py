import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# TODO: Replace "path/to/your/serviceAccountKey.json" with the actual path to your Firebase service account key file.
cred = credentials.Certificate("path/to/your/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
