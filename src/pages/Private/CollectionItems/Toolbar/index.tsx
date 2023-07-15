import { Add } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  Input,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../shared/hooks";
import { useFormik } from "formik";
import { getCollectionParams, getTags } from "../../../../store/collections";
import { addToCollection } from "../../../../store/items";
import { IItem } from "../../../../types";
import { toast } from "react-toastify";

const Toolbar = ({ collection }: any) => {
  const { collectionParams, tags } = useAppSelector(
    (state) => state.collections
  );
  const { darkMode, lang } = useAppSelector((state) => state.app);
  const username = useAppSelector((state) => state.user.username);
  const [toggle, setToggle] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState({});
  const [checkboxes, setCheckboxes] = useState<Array<boolean>>([]);
  const [colors, setColors] = useState<Array<string>>([]);

  const [initialTags, setInitialTags] = useState<Array<string>>([]);
  const [itemName, setItemName] = useState("");
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      let params = val;
      collectionParams.forEach((e: any, i) => {
        if (e.type === "checkbox") {
          params = { ...params, [e.name]: Boolean(checkboxes[i]) };
        } else if (e.type === "color") {
          params = { ...params, [e.name]: colors[i] };
        }
      });
      const newItem: IItem = {
        username,
        collectionName: collection,
        params,
        tags: initialTags,
        itemName: itemName,
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
    dispatch(getCollectionParams({ username, collection })).then((res) => {
      collectionParams.forEach((e: any) => {
        setInitialValues({ ...initialValues, [e.name]: "" });
      });
      setCheckboxes(new Array(collectionParams.length).fill(false));
      setColors(new Array(collectionParams.length).fill("#000000"));
    });
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
    <>
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
              id="itemName"
              required
              onChange={(e) => {
                setItemName(e.target.value);
              }}
              label={lang === "Ru" ? "Имя предмета" : "Name of item"}
              variant="filled"
              fullWidth
            />
            {collectionParams.map((e, i) =>
              e.type === "checkbox" ? (
                <FormControl
                  sx={{
                    height: 40,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                  key={i}
                >
                  <Input
                    id={e.name}
                    onChange={(a) => {
                      let copy = checkboxes;
                      // @ts-ignore
                      copy[i] = a.target.checked;
                      setCheckboxes(copy);
                    }}
                    type={e.type}
                  />
                  <p>{e.name}</p>
                </FormControl>
              ) : e.type === "color" ? (
                <TextField
                  fullWidth
                  label={e.name}
                  variant="filled"
                  defaultValue={"#000000"}
                  key={i}
                  required
                  id={e.name}
                  type={e.type}
                  onChange={(e) => {
                    let color = colors;
                    color[i] = e.target.value;
                    setColors(color);
                  }}
                />
              ) : e.type === "date" ? (
                <FormControl key={i} fullWidth>
                  <Typography variant="subtitle2">{e.name}:</Typography>
                  <TextField
                    placeholder={e.name}
                    fullWidth
                    variant="filled"
                    required
                    id={e.name}
                    type={"date"}
                    onChange={formik.handleChange}
                  />
                </FormControl>
              ) : (
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
              )
            )}
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
    </>
  );
};

export default Toolbar;
