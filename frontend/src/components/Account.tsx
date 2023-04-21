import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers/rootReducer";
import { setCurrentReceiver, setVisibility } from "../redux/actions";
import { useEffect, useRef } from "react";
import socket from "../socket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const AccountItem = ({ ...rest }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const { searchUser } = rest;
  const senderID = currentUser?._id;
  const receiverID = searchUser?._id;

  const handleSubmit = () => {
    dispatch(setVisibility("home"));
    dispatch(setCurrentReceiver(searchUser));
    const data = {
      senderID: receiverID,
      receiverID: senderID,
    };
    socket.emit("get-message", data);
  };

  return (
    <div
      className="flex flex-row gap-4 items-center"
      onClick={() => handleSubmit()}
    >
      <img
        src={searchUser?.avatar}
        className="w-20 h-20 rounded-full object-cover max-w-none"
        alt=""
      />
      <div className="flex flex-col">
        <span className="text-3xl">{searchUser?.username}</span>
        <span className="text-gray">{searchUser?.fullname}</span>
      </div>
    </div>
  );
};

const AccountMessage = ({ ...rest }) => {
  const dispatch = useDispatch();
  const { currentMessage, searchUser } = rest;
  const divRef = useRef<HTMLDivElement>(null);
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const currentReceiver = useSelector(
    (state: RootState) => state.currentReceiver
  );
  const senderID = currentUser?._id;
  const receiverID = searchUser?._id;

  useEffect(() => {
    if (
      divRef.current &&
      divRef.current.parentElement?.children[0] === divRef.current
    ) {
      divRef.current.click();
    }
  }, []);

  const handleSubmit = () => {
    dispatch(setCurrentReceiver(searchUser));
    dispatch(setVisibility("home"));
    const data = {
      senderID: senderID,
      receiverID: receiverID,
    };
    socket.emit("get-message", data);
  };

  return (
    <div
      className={`flex flex-row items-center gap-4 p-2 cursor-pointer ${
        currentReceiver._id === searchUser?._id && "bg-dark rounded-2xl"
      }`}
      onClick={handleSubmit}
      ref={divRef}
    >
      <img
        className="w-20 h-20 rounded-full object-cover max-w-none"
        src={
          currentMessage.senderID === currentUser
            ? currentMessage?.senderID?.avatar
            : currentMessage?.receiverID?.avatar
        }
        alt=""
      />
      <div className="flex flex-col gap-1 w-3/5">
        <h2 className="text-white text-3xl">
          {currentMessage.senderID === currentUser
            ? currentMessage?.senderID?.username
            : currentMessage?.receiverID?.username}
        </h2>
        <span className="text-white">{currentMessage?.react}</span>
        {currentMessage?.message !== ":like" ? (
          <p className="text-gray text-2xl">{currentMessage?.message}</p>
        ) : (
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="w-10 h-10 sm:w-8 sm:h-8 text-white"
          />
        )}
      </div>
      <div>
        <span className="text-gray text-2xl">
          {moment(currentMessage?.createdAt).format("HH:mm")}
        </span>
      </div>
    </div>
  );
};

const AccountStatus = ({ ...rest }) => {
  const dispatch = useDispatch();
  const { searchUser } = rest;
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const receiverID = searchUser?._id;
  const senderID = currentUser?._id;
  const handleSubmit = () => {
    dispatch(setVisibility("home"));
    dispatch(setCurrentReceiver(searchUser));
    const data = {
      senderID: receiverID,
      receiverID: senderID,
    };
    socket.emit("get-message", data);
  };

  return (
    <div
      className="flex flex-col items-center gap-2"
      onClick={() => handleSubmit()}
    >
      <img
        className="w-20 h-20 rounded-full object-cover cursor-pointer max-w-none"
        src={searchUser?.avatar}
        alt={searchUser?.fullname}
      />
      <h1 className="text-white text-2xl">{searchUser?.username}</h1>
    </div>
  );
};

export { AccountItem, AccountMessage, AccountStatus };
