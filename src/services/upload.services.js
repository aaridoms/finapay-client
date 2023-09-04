import service from "./service.config";

const uploadImageService = (imageFile) => {
  return service.post("/account/profile/edit-img", imageFile);
};

export { uploadImageService };