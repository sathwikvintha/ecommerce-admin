import { ChevronLeft, ChevronRight } from "lucide-react";

export const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div onClick={onClick} className="absolute top-24 lg:top-36 -right-5 cursor-pointer">
      <ChevronRight className="text-black" size={"20px"} />
    </div>
  );
};
export const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div onClick={onClick} className="absolute top-24 lg:top-36 -left-5 cursor-pointer">
      <ChevronLeft className="text-black" size={"20px"} />
    </div>
  );
};
