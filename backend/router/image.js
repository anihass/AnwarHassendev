const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload-middleware");
const authMiddleware = require("../middleware/AUTH-middleware");
const isadmin = require("../middleware/admin-middleware");
const {
    uploadProjectController,
    fetchProjectsController,
    deleteProjectController,
} = require("../controllers/image-controllers");


router.post(
    "/upload",
    authMiddleware,
    isadmin,
    upload.single("image"),
    uploadProjectController
);
router.get(
    "/getproject",
    fetchProjectsController
);
router.delete(
  "/deleteproject/:id",
  authMiddleware,
  isadmin,               // <-- only admins can delete
  deleteProjectController
);


module.exports = router;