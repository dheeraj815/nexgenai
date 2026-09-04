import os
import uuid

class StorageService:
    def __init__(self):
        self.base_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "uploads")
        os.makedirs(self.base_dir, exist_ok=True)

    def save_file(self, filename: str, content: bytes) -> str:
        ext = os.path.splitext(filename)[1]
        unique_name = f"{uuid.uuid4()}{ext}"
        target_path = os.path.join(self.base_dir, unique_name)
        with open(target_path, "wb") as f:
            f.write(content)
        return f"/uploads/{unique_name}"

storage_service = StorageService()
