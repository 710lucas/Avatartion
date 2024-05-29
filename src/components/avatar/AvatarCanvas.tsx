import React, { Suspense } from "react";
import { Part } from "../parts/Part";
import { PartIndexEnum } from "../../constants/parts";

type AvatarPart = {
  src: string;
};

type AvatarCanvasProps = {
  bg: string;
  hair: AvatarPart;
  eyes: AvatarPart;
  mouth: AvatarPart;
  head: AvatarPart;
  outfit: AvatarPart;
  body: AvatarPart;
  accessories: AvatarPart;
  facialHair: AvatarPart;
  skin_tone: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const AvatarCanvas = React.forwardRef<HTMLDivElement, AvatarCanvasProps>(
  (
    {
      bg = "bg-red-300",
      hair,
      eyes,
      mouth,
      head,
      outfit,
      body,
      accessories,
      facialHair,
      skin_tone,
      ...rest
    },
    ref
  ) => {
    const renderAvatarPart = (part: AvatarPart, type: string, color : string) => {
      return (
        <Suspense>
          <Part
            src={part.src}
            style={{
              zIndex: PartIndexEnum[type as unknown as PartIndexEnum],
              position: 'absolute',
              pointerEvents: 'none'
            }}
            color={color}
          />
        </Suspense>
      );
    };

    return (
      <div
        ref={ref}
        id="avatar-canvas-container"
        className={`absolute w-80 h-[294px] overflow-hidden ${bg} rounded-2xl`}
        {...rest}
      >
        {renderAvatarPart(body, "body", skin_tone)}
        {renderAvatarPart(hair, "hair", skin_tone)}
        {renderAvatarPart(eyes, "eyes", skin_tone)}
        {renderAvatarPart(mouth, "mouth", skin_tone)}
        {renderAvatarPart(head, "head", skin_tone)}
        {renderAvatarPart(outfit, "outfit", skin_tone)}
        {renderAvatarPart(accessories, "accessories", skin_tone)}
        {renderAvatarPart(facialHair, "facial-hair", skin_tone)}
      </div>
    );
  }
);