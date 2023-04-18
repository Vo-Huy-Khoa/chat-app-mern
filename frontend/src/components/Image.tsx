export const Image = ({ src, width = "32px", height = "32px" }: any) => {
  return (
    <img
      src={src}
      width={width}
      height={height}
      alt=""
      className="rounded-full w-24 h-24 object-cover cursor-pointer"
    />
  );
};
