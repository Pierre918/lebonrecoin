
import { getAllItems, getLocalisations } from "./actions";
import ListItem from "./components/ui/ListItem";


const Home =async () => {
  const itemList=await getAllItems()
  const localisations:any[] =await getLocalisations();
  return (
    <>
<ListItem localisations={localisations} itemList={itemList}></ListItem>
    </>
      );
}
export default Home