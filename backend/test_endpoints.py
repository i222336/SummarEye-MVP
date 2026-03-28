import time
import requests
import sys
import os

BASE_URL = "http://127.0.0.1:8000/api"

try:
    print("1. Testing .txt file upload (Should fail)...")
    with open(r"D:\AIPD-MVP\sample_videos\test.txt", "rb") as f:
        res = requests.post(f"{BASE_URL}/upload", files={"video": f})
        assert res.status_code == 422, f"Expected 422 but got {res.status_code}. Response: {res.text}"
        assert res.json()["code"] == "INVALID_FILE", "Wrong error code"
        print("✓ Successfully rejected .txt file.")

    print("\n2. Testing .mp4 file upload...")
    with open(r"D:\AIPD-MVP\sample_videos\waji.mp4", "rb") as f:
        res = requests.post(f"{BASE_URL}/upload", files={"video": f})
        assert res.status_code == 201, f"Expected 201 but got {res.status_code}. Response: {res.text}"
        data = res.json()
        video_id = data["video_id"]
        print(f"✓ Successfully uploaded .mp4 file. Video ID: {video_id}")

    print("\n3. Testing GET /videos/{video_id}...")
    res = requests.get(f"{BASE_URL}/videos/{video_id}")
    assert res.status_code == 200, f"Expected 200 but got {res.status_code}"
    print("✓ Successfully fetched video details.")
    print(res.json())

    print("\n4. Testing GET /videos...")
    res = requests.get(f"{BASE_URL}/videos")
    assert res.status_code == 200, f"Expected 200 but got {res.status_code}"
    print("✓ Successfully fetched all videos list.")
    
    print("\n5. Verifying DB record and file on disk...")
    # Get the actual filename returned
    actual_filename = data["filename"]
    expected_path = os.path.join("uploads", f"{video_id}_waji.mp4")
    assert os.path.exists(expected_path), f"File missing: {expected_path}"
    print("✓ DB and File verified on disk!")

    print("\nAll tests passed successfully!")
except Exception as e:
    print(f"Test failed: {e}")
    sys.exit(1)

sys.exit(0)
