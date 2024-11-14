import { CompositionDisplaySetting } from "@graphql/graphql";
import { GetDisplaySetting, GetVerticalPadding } from "@helpers/style";
import clsx from "clsx";

export function GetTileStyles(displaySettings?: CompositionDisplaySetting[]) {
  let classes: any = {
    tile: true,
  };

  if (!displaySettings) {
    return clsx(classes);
  }

  const theme = GetDisplaySetting(displaySettings, "theme", "default");
  classes[`tile--${theme}`] = true;
  classes = GetVerticalPadding(displaySettings, classes);

  return clsx(classes);
}