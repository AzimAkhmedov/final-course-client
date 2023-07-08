import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { deleteItem, getAllItems } from "../../../store/admin";
import { IItem } from "../../../types";
import { Button } from "@mui/material";

const columns: GridColDef[] = [
  { field: "_id", headerName: "_id", width: 220 },
  { field: "collectionName", headerName: "Collection Name", width: 200 },
  { field: "username", headerName: "Owner", width: 130 },

  {
    field: "itemName",
    headerName: "name",
    width: 320,
  },
];
const ItemsPage = () => {
  const [selected, setSelected] = useState<Array<string>>([]);
  const { allItems } = useAppSelector((state) => state.admin);
  const token = useAppSelector((state) => state.user.adminToken);
  const { lang } = useAppSelector((state) => state.app);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllItems(token)).then((res) => {
      if (res.meta.requestStatus === "rejected") {
        setError(true);
      }
    });
  }, []);
  const handleGetRowId = (e: IItem) => {
    return String(e._id);
  };
  const handleDelete = (selected: Array<string>) => (e: React.MouseEvent) => {
    if (window.confirm(lang === "En" ? "Delete?" : "Удалить?")) {
      selected.forEach((e) => {
        dispatch(deleteItem(e));
      });
    }
  };
  return error ? (
    <div className="container">{lang === "En" ? "Error" : "Ошибка"}</div>
  ) : (
    <div className="container">
      <DataGrid
        columns={columns}
        rows={allItems}
        getRowId={handleGetRowId}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        checkboxSelection
        onRowSelectionModelChange={(e) => {
          // @ts-ignore
          setSelected(e);
          console.log(e);
        }}
      />
      <Button
        variant="contained"
        disabled={!selected.length}
        onClick={handleDelete(selected)}
      >
        {lang === "En" ? "Delete Items" : "Удалить Предметы"}
      </Button>
    </div>
  );
};

export default ItemsPage;
