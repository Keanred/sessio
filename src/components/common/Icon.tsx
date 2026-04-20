import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import type { SvgIconProps } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ComponentType } from 'react';

type IconProps = {
  name: string;
  className?: string;
  filled?: boolean;
  sx?: SxProps<Theme>;
};

const outlinedIcons: Record<string, ComponentType<SvgIconProps>> = {
  arrow_forward: ArrowForwardRoundedIcon,
  bolt: BoltRoundedIcon,
  code: CodeRoundedIcon,
  edit_note: EditNoteRoundedIcon,
  forum: ForumRoundedIcon,
  public: PublicRoundedIcon,
  settings: SettingsRoundedIcon,
  stop_circle: StopCircleOutlinedIcon,
  start_circle: PlayCircleRoundedIcon,
  terminal: TerminalRoundedIcon,
};

const filledIcons: Record<string, ComponentType<SvgIconProps>> = {
  ...outlinedIcons,
  stop_circle: StopCircleIcon,
  start_circle: PlayCircleRoundedIcon,
};

export const Icon = ({ name, className, filled = false, sx }: IconProps) => {
  const IconComponent = (filled ? filledIcons[name] : outlinedIcons[name]) ?? HelpOutlineRoundedIcon;

  return <IconComponent className={className} sx={sx} aria-hidden="true" />;
};
