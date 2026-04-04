# SummarEye AI — MVP Feature Document

SummarEye AI is an immersive, AI-powered web application designed to ingest raw CCTV surveillance footage and output an intelligent, compressed timeline of critical events. 

The MVP focuses on autonomous threat and behavior detection wrapped in a highly stylized "Hacker/Cyberpunk" terminal interface.

---

## 1. Core Processing & Infrastructure
* **Asynchronous Processing Pipeline**: Videos are ingested via the FastAPI backend and instantly queued for background evaluation, allowing users to freely navigate the dashboard without blocking the interface.
* **Format Agnostic**: Accepts standard `.mp4`, `.avi`, and `.mov` security footage formats up to `500MB` per file.
* **Local Persistence**: Maintains a strict `sightline.db` SQLite database, keeping all analytical metadata locally secured alongside saved extraction clips.

## 2. Dual-Model AI Detection Engine
* **Double Neural Networks**: Utilizes the standard `yolov8n.pt` model to detect people and common animals (dogs, cats, etc.) simultaneously alongside a custom `All_weapon.pt` YOLO model trained to identify firearms and weaponry.
* **Optimized FPS Sampling**: Analyzes footage efficiently at 5 Frames Per Second (FPS) — acting as a perfect intersection between processing speed and catching high-speed events without missing frames.
* **Precision Confidence Thresholds**: Ignores artifact movement by strictly enforcing a `>50%` confidence threshold. Any detection below this line is discarded, highly reducing false positives.

## 3. Smart Event Clipping & Aggregation
* **Time-Series Merging**: Converts frame-by-frame detections into continuous "Events". If the AI loses sight of a target momentarily, it will dynamically bridge gaps under 5 seconds to treat it as a single action event.
* **Static Footage Elimination**: Dynamically slices the master video into micro-clips, extracting *only* the footage where targets are present. Adds a smooth 2-second buffer to the start and end of clips to prevent cutting off the action.
* **Highlight Thumbnails**: Identifies the midpoint/peak of every event clip and extracts a thumbnail image locally, complete with YOLO boxes painted natively on the frame.

## 4. Threat Assessment Logic
* **Loitering Detection**: Implements a time-duration algorithm. If a person maintains a continuous presence for over 900 seconds (15 minutes), the normal event escalates to a **Critical Alert**.
* **Weapon Alerts**: Immediate escalation. Any frame detecting a weapon instantly flags the event as a Critical Alert regardless of duration.

## 5. Global Analytics Dashboard (`/analytics`)
* **Real-time Overview**: Aggregates metadata across every processed video library to deliver system-wide intelligence statistics.
* **Data Visualizations**: 
  * *Alert Trends*: An interactive Area Chart tracking alerts and standard events chronologically.
  * *Event Distribution*: A Bar Chart classifying occurrences by type (weapons vs. loitering vs. standard detection).
  * *Status Breakdown*: A Pie Chart summarizing processing task distribution (Done, Error, Pending).
* **Recent Alerts Feed**: A terminal-styled, chronological log detailing the latest 10 Critical Alerts globally.

## 6. Immersive "Hacker" User Experience
* **Terminal Cyber Aesthetic**: A cohesive UI identity built on pure black (`#000000`), neon green (`#00ff41`), and emergency neon red. Styled utilizing the `Fira Code` monospace font to emulate a classic surveillance terminal.
* **Neural Network Loading Animation**: Bypasses traditional loading spinners in favor of a custom HTML5 Canvas animation simulating a working neural net, complete with flying tensor particles and witty, rotating terminal outputs.
* **Visual Data Overlays**: Final processed micro-clips feature hardcoded bounding boxes tracking targets precisely alongside their algorithmic confidence scores.
* **Live Notification System**: Features a polling notification bell that audits the backend every 10 seconds. Alerts the user to finished footage processing both visually (badge) and audibly via a subtle Web Audio API synthetic terminal beep.

---
*Version 1.0.0-MVP*
