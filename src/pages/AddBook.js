import { useState, useRef } from "react";
import {
  Paper,
  Stack,
  IconButton,
  Button,
  Box,
  styled,
  TextField,
  Container,
  Grid,
} from "@mui/material";
import { DeleteRounded, ImageRounded } from "@mui/icons-material";
import "./Addbook.css";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { uuidv4 } from "@firebase/util";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [point, setPoint] = useState(10);
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const fileInput = useRef(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handlePointChange = (event) => {
    setPoint(event.target.value);
  };

  const onDeleteImage = (url) => {
    const filteredImages = images.filter((image) => image != url);
    setImages(filteredImages);
  };

  const onImageSelect = (e) => {
    if (e.target.files) {
      const fileList = e.target.files;
      const newImages = [];
      let lastId = images.length;

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const url = URL.createObjectURL(file);
        const id = lastId + 1;
        newImages.push(url);
        lastId = id;
      }

      setImages((oldImages) => [...newImages]);
      uploadImage(fileList[0]);
    }
  };

  const uploadImage = (file) => {
    // Make the path unique by adding UUID before filename maybe.
    const filePath = "/bookImgs/" + uuidv4() + file.name;
    const storageRef = ref(storage, filePath);

    uploadBytes(storageRef, file)
      .then(() => {
        getDownloadURL(storageRef)
          .then((url) => {
            setImageUrl(url);
          })
          .catch((error) => {
            console.error(error.message);
          });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const onImageChange = (e) => {
    if (fileInput.current != null) {
      fileInput.current.click();
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log("book added");
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <Container maxWidth="md">
        <Paper sx={{ m: "50px", p: "30px" }}>
          <Stack direction="column" spacing={2}>
            <TextField
              id="standard-Title"
              label="Title"
              variant="standard"
              required
              margin="normal"
              value={title}
              InputProps={{ style: { fontSize: 30 } }}
              InputLabelProps={{ style: { fontSize: 20 } }}
              onChange={handleTitleChange}
            />

            <TextField
              id="standard-multiline-flexible"
              label="Description"
              multiline
              maxRows={4}
              value={description}
              onChange={handleDescriptionChange}
              variant="standard"
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="standard-Title"
                  label="Author"
                  variant="standard"
                  margin="normal"
                  value={author}
                  onChange={handleAuthorChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="standard-Title"
                  label="Points"
                  variant="standard"
                  margin="normal"
                  value={point}
                  onChange={handlePointChange}
                />
              </Grid>
            </Grid>
          </Stack>
          <br />

          {images.length > 0 && (
            <Box className="img-list">
              {images.map((image, index) => (
                <div className="img-container" key={index + ""}>
                  <img className="img" src={image} width="350" height="350" />
                  <IconButton
                    sx={styling.btnDelete}
                    onClick={() => onDeleteImage(image)}
                  >
                    <DeleteRounded />
                  </IconButton>
                </div>
              ))}
            </Box>
          )}

          <Stack direction="row" sx={styling.btnContainer}>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInput}
              onChange={onImageSelect}
            />
            <IconButton onClick={onImageChange}>
              <ImageRounded fontSize="medium" />
            </IconButton>
            <Box sx={{ m: 1, position: "relative" }}>
              <Button type="submit" variant="contained" color="secondary">
                Add Book
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </form>
  );
};

export default AddBook;

const styling = {
  btnDelete: {
    position: "absolute",
    top: "2%",
    right: "2%",
  },
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-12px",
    marginLeft: "-12px",
  },
  btnContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
};
