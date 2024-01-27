import {useParams} from "react-router-dom";

export function MainPicListItem(props) {
  let {id} = useParams();

  return (
    <div>MainPicListItem id: [{id}]</div>
  );
}
