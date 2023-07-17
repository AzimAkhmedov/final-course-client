import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { adminDeleteCollection, getAllCollections } from "../../../store/admin";
import { ICollection } from "../../../types";
import { Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import Loading from "../../../shared/components/Loading";
import { useNavigate } from "react-router-dom";
import s from "./index.module.scss";
const columns: GridColDef[] = [
  { field: "_id", headerName: "_id", width: 220 },
  { field: "collectionName", headerName: "Collection Name", width: 200 },
  { field: "username", headerName: "Owner", width: 130 },
  {
    field: "description",
    headerName: "description",
    width: 320,
  },
];
const CollectionPage = () => {
  const [selected, setSelected] = useState<Array<GridRowId>>([]);
  const { lang, darkMode } = useAppSelector((state) => state.app);
  const { allCollections, loading } = useAppSelector((state) => state.admin);
  const token = useAppSelector((state) => state.user.adminToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllCollections());
  }, []);
  const handleGetRowId = (e: ICollection) => {
    return String(e._id);
  };
  return loading ? (
    <Loading />
  ) : (
    <div className={darkMode ? s.darkMode + " " : "" + "  "}>
      <h1>{lang === "Ru" ? "Все коллекции" : "All Collections"}</h1>
      <p>
        {lang === "Ru"
          ? "Выберите один и нажмите перейти чтоб перейти к коллекции"
          : "Select single collection and click Go! to go for collection page"}
      </p>

      <DataGrid
        onRowSelectionModelChange={(e) => {
          setSelected(e);
        }}
        columns={columns}
        rows={allCollections}
        
        sx={{
          color: darkMode ? "#fff" : "",
        }}
        pageSizeOptions={[10, 20]}
        getRowId={handleGetRowId}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        checkboxSelection
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          paddingTop: "20px",
        }}
      >
        <Button
          onClick={() => {
            if (
              window.confirm(
                lang === "En" ? "Are u sure to delete?" : "Уверены?"
              )
            ) {
              selected.forEach((e) => {
                dispatch(adminDeleteCollection({ _id: e, token })).then(
                  (res) => {
                    if (res.meta.requestStatus === "rejected") {
                      toast(
                        lang === "En"
                          ? "Failed to delete "
                          : "Ошибка при удалении",
                        { type: "error" }
                      );
                    }
                  }
                );
              });
            }
          }}
          variant="contained"
          color={darkMode ? "warning" : "primary"}
          disabled={!selected.length}
        >
          {lang === "Ru" ? "Удалить выбранное" : "Delete selected"}
        </Button>
        <Button
          color={darkMode ? "warning" : "primary"}
          variant="contained"
          onClick={() => {
            const obj = allCollections.find((e) => e._id === selected[0]);

            navigate(
              "/admin/collections/" + obj?.collectionName + "/" + obj?.username
            );
          }}
          disabled={selected.length !== 1}
        >
          {lang === "Ru" ? "Перейти" : "Go!"}
        </Button>
      </Box>
    </div>
  );
};

export default CollectionPage;
