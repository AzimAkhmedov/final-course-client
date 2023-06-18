import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getCollectionParams } from "../../../store/collections";
import s from "./CreateItem.module.scss";

const CreateItem = () => {
  const { collection } = useParams();
  const dispatch = useAppDispatch();
  const { loading, collectionParams } = useAppSelector(
    (state) => state.collections
  );
  const username = useAppSelector((state) => state.user.username);
  useEffect(() => {
    dispatch(getCollectionParams({ username, collection }));
  }, []);
  return loading ? (
    <>Загрузка</>
  ) : (
    <div className={"container " + s.root}>
      <h1>
        Для обавление заполните свойства к предмету от к коллекции {collection}
      </h1>
      <form>
        <h2>Свойства</h2>
        <div className="params">
          {collectionParams.map((e) => (
            <input placeholder={e} required />
          ))}
        </div>
        <button type="submit">Создать</button>
      </form>
    </div>
  );
};

export default CreateItem;
