import socket from "../../socket";
import { Image } from "../../components/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCircleInfo,
  faCopy,
  faFileImage,
  faMicrophone,
  faPhone,
  faThumbsUp,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { IMessage } from "../../types";
import { getProfile } from "../../services";
import { setCurrentUser, setSelectMessage, setVisibility } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";

const Home = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state: RootState) => state.currentUser);
  const currentReceiver = useSelector(
    (state: RootState) => state.currentReceiver
  );
  const selectMessage = useSelector((state: RootState) => state.currentMessage);
  const [valueMessage, setValueMessage] = useState("");
  const currentSenderID = currentUser?._id;
  const currentReceiverID = currentReceiver?._id;
  const countMessage = currentReceiver._id.length ? 1 : null;

  const emitMessage = (message: string) => {
    const data = {
      senderID: currentSenderID,
      receiverID: currentReceiverID,
      message: message,
    };
    socket.emit("message", data);
    setValueMessage("");
  };

  const handleCreateMessage = (event: any) => {
    event.preventDefault();
    emitMessage(valueMessage);
  };

  const handleCreateLike = (event: any) => {
    event.preventDefault();
    emitMessage(":like");
  };

  const handleReturnSidebar = ()=>{
    dispatch(setVisibility("sidebar"));
  }
  const handleReturnNotification = ()=>{
    dispatch(setVisibility("notification"));
  }

  useEffect(() => {
    const handleNewMessage = (data: any = []) => {
      const sortedMessages = data.sort(
        (a: IMessage, b: IMessage) =>
          Date.parse(a.createdAt) - Date.parse(b.createdAt)
      );
      dispatch(setSelectMessage(sortedMessages));
    };

    socket.on("message", handleNewMessage);

    return () => {
      socket.off("message", handleNewMessage);
    };
  }, [dispatch]);

  useEffect(() => {
    getProfile().then((res) => {
      dispatch(setCurrentUser(res.data));
    });
  }, [dispatch]);

  return (
    <div className="h-full w-full">
      <div className="fixed top-0 custom-w-home sm:w-full h-32 bg-primary flex flex-row items-center justify-around sm:left-0 sm:px-2 sm:gap-2">
        <div className=" w-3/5 flex flex-row 2xl:justify-end 2xl:items-end xl:justify-end xl:items-center sm:justify-around sm:items-center sm:gap-1 sm:w-4/6 sm:text-xl">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="w-12 h-12 text-blue hidden sm:block"
                    onClick={handleReturnSidebar}
                  />
                  {countMessage !== null && (
                    <div className="flex flex-row gap-8 items-center sm:gap-2">
                      <img src={currentReceiver?.avatar} className="w-24 h-24 rounded-full object-cover sm:w-20 sm:h-20" alt={currentReceiver?.fullname} />
                        <p className=" text-white text-4xl sm:text-3xl">{currentReceiver?.fullname}</p>
                    </div>
                  )}
        </div>

        <div className="w-2/5 flex flex-row justify-end gap-10  text-blue sm:gap-5 sm:w-1/5">
              <FontAwesomeIcon icon={faPhone} className="w-10 h-10 cursor-pointer sm:w-9 sm:h-9" />
              <FontAwesomeIcon icon={faVideoCamera} className="w-10 h-10 cursor-pointer sm:w-9 sm:h-9" />
              <FontAwesomeIcon icon={faCircleInfo} className="w-10 h-10 cursor-pointer sm:w-9 sm:h-9"
              onClick={handleReturnNotification}
              />
          </div>

      </div>
      <div className="bg-black py-32 h-full">
        <div className="flex flex-col overflow-y-auto h-full p-8 gap-8">
          {selectMessage.map((message, index) => {
            if (message.senderID._id !== currentUser._id) {
              return (
                <div key={index} className="relative flex flex-row gap-4">
                  <img
                    src={message.senderID.avatar}
                    className="w-20 h-20 rounded-full object-cover"
                    alt="sender"
                  />
                  {message.message !== ":like" ? (
                    <div className="bg-primary  h-full rounded-3xl text-white text-3xl p-4 leading-10">
                      <p>{message.message}</p>
                    </div>
                  ) : (
                    <div className="bg-primary  h-full rounded-3xl text-white text-3xl p-4 leading-10">
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className="w-10 h-10 sm:w-8 sm:h-8 text-white"
                      />
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className="relative flex flex-row-reverse gap-4"
                >
                  <img
                    src={message.senderID.avatar}
                    className="w-20 h-20 rounded-full object-cover"
                    alt="sender"
                  />
                  {message.message !== ":like" ? (
                    <div className="bg-blue  h-full rounded-3xl text-black text-3xl p-4 leading-10">
                      <p>{message.message}</p>
                    </div>
                  ) : (
                    <div className="bg-blue  h-full rounded-3xl text-black text-3xl p-4 leading-10">
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className="w-10 h-10 sm:w-8 sm:h-8 text-white"
                      />
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
      </div>
      (
      {countMessage !== null && (
        <div className="fixed bottom-0 custom-w-home sm:w-full h-28 bg-primary flex flex-col justify-center sm:left-0">
          <div className="flex flex-row justify-between items-center gap-6 sm:gap-4 sm:px-4">
            <div className="flex flex-row gap-2 items-center">
              <FontAwesomeIcon
                icon={faFileImage}
                className="w-10 h-10 sm:w-8 sm:h-8 text-blue"
              />
              <FontAwesomeIcon
                icon={faCopy}
                className="w-10 h-10 sm:w-8 sm:h-8 text-blue"
              />
              <FontAwesomeIcon
                icon={faMicrophone}
                className="w-10 h-10 sm:w-8 sm:h-8 text-blue"
              />
            </div>
            <input
              type="text"
              className="w-full h-16 rounded-3xl text-2xl pl-4 bg-gray text-white font-semibold"
              onChange={(event) => {
                setValueMessage(event.target.value);
              }}
            />

            {valueMessage !== "" ? (
              <button
                onClick={handleCreateMessage}
                className="bg-blue w-28 h-14 rounded-xl text-black text-2xl font-bold"
              >
                Send
              </button>
            ) : (
              <button
                onClick={handleCreateLike}
                className="bg-blue w-16 h-14 rounded-xl text-black text-2xl font-bold"
              >
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  className="w-10 h-10 sm:w-8 sm:h-8 text-white"
                />
              </button>
            )}
          </div>
        </div>
      )}
      )
    </div>
  );
};

export { Home };
