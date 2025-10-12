'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'blue' | 'green' | 'red' | 'purple' | 'yellow';
  text?: string;
  fullScreen?: boolean;
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

const colorMap = {
  blue: 'border-blue-600',
  green: 'border-green-600',
  red: 'border-red-600',
  purple: 'border-purple-600',
  yellow: 'border-yellow-600',
};

export default function LoadingSpinner({
  size = 'md',
  color = 'blue',
  text = '',
  fullScreen = false,
}: LoadingSpinnerProps) {
  const spinner = (
    <div className="flex flex-col items-center gap-4">
      {/* Spinner principal */}
      <div className="relative">
        <div className={`animate-spin rounded-full ${sizeMap[size]} border-t-4 border-b-4 ${colorMap[color]}`}></div>
        <div className={`absolute inset-0 animate-spin rounded-full ${sizeMap[size]} border-r-4 border-l-4 border-purple-600`} 
             style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>

      {/* Texto */}
      {text && (
        <div className="text-center">
          <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {text}
          </p>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tr from-pink-400/20 to-indigo-600/20 rounded-full blur-3xl animate-float" 
               style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative z-10">
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
}