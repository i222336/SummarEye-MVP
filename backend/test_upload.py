import requests
import os

BASE_URL = "http://127.0.0.1:8000/api"

def run_tests():
    print("=== Testing Upload Errors ===")
    
    # Test 1: Invalid extension
    test_txt_path = r"D:\AIPD-MVP\sample_videos\test.txt"
    with open(test_txt_path, "rb") as f:
        res = requests.post(f"{BASE_URL}/upload", files={"video": ("test.txt", f, "text/plain")})
        print(f"Status Code for test.txt: {res.status_code}")
        print(f"Response: {res.json()}")
        assert res.status_code == 422, "Expected 422 for .txt"
    
    # Test 2: Valid Video Upload
    print("\n=== Testing Valid Video Upload ===")
    waji_path = r"D:\AIPD-MVP\sample_videos\waji.mp4"
    with open(waji_path, "rb") as f:
        print("Uploading waji.mp4... this may take a moment for 47MB")
        res = requests.post(f"{BASE_URL}/upload", files={"video": ("waji.mp4", f, "video/mp4")})
        print(f"Status Code for waji.mp4: {res.status_code}")
        data = res.json()
        print(f"Response: {data}")
        assert res.status_code == 201, "Expected 201 Created"
        video_id = data.get("video_id")
    
    # Test 3: Get single video
    print(f"\n=== Testing GET /videos/{video_id} ===")
    res = requests.get(f"{BASE_URL}/videos/{video_id}")
    print(f"Status Code: {res.status_code}")
    print(f"Response: {res.json()}")
    assert res.status_code == 200, "Expected 200"
    
    # Test 4: Get multiple videos
    print("\n=== Testing GET /videos ===")
    res = requests.get(f"{BASE_URL}/videos")
    print(f"Status Code: {res.status_code}")
    print(f"Response Count: len({len(res.json())})")
    assert res.status_code == 200, "Expected 200"

    print("\n✅ All End-to-End API Backend tests passed successfully!")

if __name__ == "__main__":
    run_tests()
