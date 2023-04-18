import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBars,
  faBell,
  faPhone,
  faToggleOff,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Image } from "../../components/Image";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";
import { setVisibility } from "../../redux/actions";
const Notification = () => {
  const dispatch = useDispatch();
  const currentReceiver = useSelector(
    (state: RootState) => state.currentReceiver
  );
  const isVisible = useSelector((state: RootState) => state.currentVisibility);

  const handleHome = () => {
    dispatch(setVisibility("home"));
  };
  return (
    <div className="h-full flex flex-col gap-14 p-4 sm:p-8">
      <div className="w-full flex flex-row justify-between">
        {isVisible === "notification" && (
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={handleHome}
            className="text-white text-4xl"
          />
        )}
        {isVisible === "notification" && (
          <FontAwesomeIcon icon={faBars} className="text-white text-4xl" />
        )}
      </div>
      <div className="text-white flex flex-col items-center gap-6">
        <Image
          className="rounded-full"
          src={currentReceiver.avatar}
          width="60px"
          height="60px"
        />
        <h1 className="text-4xl">{currentReceiver.username}</h1>
        <h2 className="text-4xl text-gray">{currentReceiver.fullname}</h2>
        <div className="flex flex-row justify-center gap-10 w-full">
          <FontAwesomeIcon icon={faPhone} className="w-10 h-10" />
          <FontAwesomeIcon icon={faUser} className="w-10 h-10 text-green-700" />
          <FontAwesomeIcon icon={faBars} className="w-10 h-10" />
        </div>
      </div>
      <div className="text-white text-2xl flex flex-col gap-4">
        <div className="flex flex-row justify-around">
          <FontAwesomeIcon icon={faBell} className="w-12 h-12" />
          <h2>Notifications</h2>
          <FontAwesomeIcon icon={faToggleOff} className="w-12 h-12" />
        </div>
        <div className="flex flex-row justify-around">
          <FontAwesomeIcon icon={faBell} className="w-12 h-12" />
          <h2>Bookmarks</h2>
          <button className="w-12 h-12">16</button>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="text-2xl text-white flex flex-row justify-between">
            <span>share medias</span>
            <NavLink to="" className="text-blue">
              View all
            </NavLink>
          </div>
          <div className="flex flex-row justify-around gap-4">
            <img
              className="w-20 h-20 rounded-2xl"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyDMHegIuD-AOAtcpNGPSdAkWK0FMIU7qNTw&usqp=CAU"
              alt=""
            />
            <img
              className="w-20 h-20 rounded-2xl"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyDMHegIuD-AOAtcpNGPSdAkWK0FMIU7qNTw&usqp=CAU"
              alt=""
            />
            <img
              className="w-20 h-20 rounded-2xl"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyDMHegIuD-AOAtcpNGPSdAkWK0FMIU7qNTw&usqp=CAU"
              alt=""
            />
            <img
              className="w-20 h-20 rounded-2xl"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyDMHegIuD-AOAtcpNGPSdAkWK0FMIU7qNTw&usqp=CAU"
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="text-white text-2xl flex flex-row justify-between">
            <span>share files</span>
            <NavLink to="" className="text-blue">
              View all
            </NavLink>
          </div>
          <div className="flex flex-col gap-4 text-2xl">
            <div className="flex flex-row gap-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-k-5EjtwnDbrOsipvcwsU37OIJO38Etp7v5enr9dEw9RJkT7BismQoYmsWXHgqw47a14&usqp=CAU"
                alt=""
                className="w-20 h-20 rounded-lg"
              />
              <div className="text-white flex flex-col gap-4">
                <span>File Name</span>
                <p>File Description</p>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-k-5EjtwnDbrOsipvcwsU37OIJO38Etp7v5enr9dEw9RJkT7BismQoYmsWXHgqw47a14&usqp=CAU"
                alt=""
                className="w-20 h-20 rounded-lg"
              />
              <div className="text-white flex flex-col gap-4">
                <span>File Name</span>
                <p>File Description</p>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-k-5EjtwnDbrOsipvcwsU37OIJO38Etp7v5enr9dEw9RJkT7BismQoYmsWXHgqw47a14&usqp=CAU"
                alt=""
                className="w-20 h-20 rounded-lg"
              />
              <div className="text-white flex flex-col gap-4">
                <span>File Name</span>
                <p>File Description</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Notification };
