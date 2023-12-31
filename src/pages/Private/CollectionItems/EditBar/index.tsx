import {
  Box,
  Button,
  FormControl,
  Input,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../shared/hooks";
import {
  getCollectionParams,
  getTags,
  updateItem,
} from "../../../../store/collections";
import { useFormik } from "formik";
import { IItem } from "../../../../types";
import { toast } from "react-toastify";
interface IEditProps {
  collection: string;
  _id?: string;
  open: boolean;
  setOpen: Function;
  itemName: string;
}
const EditBar = ({ collection, open, setOpen, _id, itemName }: IEditProps) => {
  const dispatch = useAppDispatch();
  const [initialValues, setInitialValues] = useState<any>({});
  const [itemNamechange, setItemName] = useState("");
  const [checkboxes, setCheckboxes] = useState<Array<boolean>>([]);
  const [colors, setColors] = useState<Array<string>>([]);
  const [initialTags, setInitialTags] = useState<Array<string>>([]);

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
        _id,
        collectionName: collection,
        params,
        tags: initialTags,
        itemName: itemNamechange,
      };
      dispatch(updateItem(newItem)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast(lang === "En" ? "Saved" : "Сохранено", {
            type: "success",
          });
          setOpen(false);
        } else {
          toast(
            lang === "En" ? "Error, try later" : "Ошибка, повторите позже",
            {
              type: "error",
            }
          );
        }
      });
    },
  });
  const collectionParams = useAppSelector(
    (state) => state.collections.collectionParams
  );
  const username = useAppSelector((state) => state.user.username);

  const { lang, darkMode } = useAppSelector((state) => state.app);
  const toggleDrawer =
    (o: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(o);
    };
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
  return (
    <SwipeableDrawer
      sx={{ background: darkMode ? "rgba(0, 0, 0, 0.685)" : "" }}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      open={open}
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
            fullWidth
            label={itemName}
            onChange={(e) => {
              setItemName(e.target.value);
            }}
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
              <FormControl fullWidth key={i}>
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
          <Button type="submit" variant="contained">
            {lang === "En" ? "Confirm Edit" : "Сохранить изменения"}
          </Button>
        </form>
      </Box>
    </SwipeableDrawer>
  );
};

export default EditBar;
