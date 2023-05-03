import { Avatar } from "./Avatar";
import { IconButton } from "./IconButton";
import { ReactComponent as IconMoon } from "./Icons/icon-moon.svg";
import { ReactComponent as IconLogo } from "./Icons/logo.svg";

export const Sidebar = () => {
  return (
    <nav className="flex flex-col justify-between bg-secondary-700 rounded-r-lg">
      <Logo />
      <div className="flex flex-col items-center divide-y">
        <div className="p-4">
          <IconButton icon={<IconMoon />} />
        </div>
        <div className="p-4">
          <Avatar />
        </div>
      </div>
    </nav>
  );
};

const Logo = () => {
  return (
    <div className="relative overflow-hidden p-4 flex justify-center items-center bg-primary-500 aspect-square rounded-r-lg after:absolute after:rounded-tl-lg after:bg-primary-300 after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:z-0">
      <IconLogo className="z-10" />
    </div>
  );
};
