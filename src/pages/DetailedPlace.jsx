import { useParams } from "react-router-dom";

export default function DetailedPlace() {
  const { id  } = useParams();

  return (
    <main>DetailedPlace page {id}</main>
  )
}