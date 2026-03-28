---
description: End-to-end test of the video upload flow
---

# Test Upload Flow


1. Open browser preview at http://localhost:5173
2. Upload the file at sample_videos/demo_clip.mp4 using the upload interface
3. Confirm the upload succeeds and a video_id is returned
4. Confirm the file appears in backend/uploads/ folder
5. Confirm a database record was created by calling GET /api/videos/{video_id}
6. Screenshot the result and report pass or fail
