import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getAllItems } from "../../../store/admin";
import { IItem } from "../../../types";

const columns: GridColDef[] = [
  { field: "_id", headerName: "_id", width: 220 },
  { field: "collectionName", headerName: "Collection Name", width: 200 },
  { field: "username", headerName: "Owner", width: 130 },

  {
    field: "name",
    headerName: "description",
    width: 320,
  },
];
const ItemsPage = () => {
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
      />
    </div>
  );
};

export default ItemsPage;
