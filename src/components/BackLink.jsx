import { Link } from "react-router-dom";
import { ReactComponent as IconArrowLeft } from "components/Icons/icon-arrow-left.svg";

export const BackLink = ({ to }) => {
  return (
    <Link to={to} className="flex items-center gap-4">
      <IconArrowLeft />
      <span>Go back</span>
    </Link>
  );
};
