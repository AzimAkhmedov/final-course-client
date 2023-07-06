import { useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getAllCollections } from "../../../store/admin";
import { ICollection } from "../../../types";

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
  const { allCollections, loading } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCollections());
  }, []);

  const handleGetRowId = (e: ICollection) => {
    return String(e._id);
  };
  return (
    <div className="container">
      <DataGrid
        columns={columns}
        rows={allCollections}
        pageSizeOptions={[10, 20]}
        getRowId={handleGetRowId}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
      />
    </div>
  );
};

export default CollectionPage;
