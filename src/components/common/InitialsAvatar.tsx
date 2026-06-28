import lakshayDp from '../../assets/lakshay_dp.png';
import harshDp from '../../assets/harsh_dp.png';

interface InitialsAvatarProps {
  initials: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

export function InitialsAvatar({ initials, color, size = 'md' }: InitialsAvatarProps) {
  const imageMap: Record<string, string> = {
    PS: lakshayDp,
    HD: harshDp,
  };

  const imageSrc = imageMap[initials];

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0 overflow-hidden`}
      style={{ backgroundColor: imageSrc ? '#ffffff' : color }}
    >
      {imageSrc ? (
        <img src={imageSrc} alt={`${initials} avatar`} className="w-full h-full object-cover scale-125" />
      ) : (
        initials
      )}
    </div>
  );
}
