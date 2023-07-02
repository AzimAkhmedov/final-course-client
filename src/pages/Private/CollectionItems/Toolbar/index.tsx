import { Add } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Drawer,
  SwipeableDrawer,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../shared/hooks";
import { useFormik } from "formik";
import { getCollectionParams, getTags } from "../../../../store/collections";
import { addToCollection } from "../../../../store/items";
import { IItem } from "../../../../types";
import { toast } from "react-toastify";
// import TagInput from "../TagInput";

const Toolbar = ({ collection }: any) => {
  const { collectionParams, tags } = useAppSelector(
    (state) => state.collections
  );
  const { darkMode, lang } = useAppSelector((state) => state.app);
  const username = useAppSelector((state) => state.user.username);
  const [toggle, setToggle] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState({});
  const [initialTags, setInitialTags] = useState<Array<string>>([]);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      const newItem: IItem = {
        username,
        collectionName: collection,
        params: val,
        tags: initialTags,
      };

      dispatch(addToCollection(newItem)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast(
            lang === "Ru"
              ? "Новый предмет добавлен успешно"
              : "New Item added succesfuly",
            { type: "success" }
          );
        }
      });
    },
  });
  useEffect(() => {
    collectionParams.forEach((e: any) => {
      setInitialValues({ ...initialValues, [e.name]: "" });
    });
  }, [collectionParams]);
  useEffect(() => {
    dispatch(getCollectionParams({ username, collection }));
    dispatch(getTags());
    setInitialValues({});
  }, []);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setToggle(open);
    };
  return (
    <aside>
      <div>
        <Button onClick={toggleDrawer(true)}>
          {lang === "Ru" ? "Создать Новый Предмет" : "Create New Item"}
          <Add />
        </Button>
      </div>
      <SwipeableDrawer
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        anchor="right"
        open={toggle}
        sx={{ background: darkMode ? "rgba(0, 0, 0, 0.685)" : "" }}
      >
        <Box
          sx={{
            width: 300,
            padding: "20px 20px",
          }}
          role="presentation"
        >
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="name"
              onChange={formik.handleChange}
              label={lang === "Ru" ? "Имя предмета" : "Name of item"}
              variant="filled"
              fullWidth
            />
            {collectionParams.map((e, i) => (
              <TextField
                fullWidth
                label={e.name}
                variant="filled"
                key={i}
                required
                id={e.name}
                type={e.type}
                onChange={formik.handleChange}
              />
            ))}
            <Autocomplete
              multiple
              id="tags-filled"
              options={tags.map((e) => e.tag)}
              freeSolo
              renderTags={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                    onDelete={(e) => {
                      getTagProps({ index }).onDelete(e);
                    }}
                    key={index}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label={lang === "Ru" ? "Теги" : "Tags"}
                />
              )}
              onChange={(e, a) => {
                setInitialTags(a);
              }}
            />
            <Button type="submit">
              {lang === "Ru" ? "Создать" : "Create"}
            </Button>
          </form>
        </Box>
      </SwipeableDrawer>
    </aside>
  );
};

export default Toolbar;
