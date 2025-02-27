
import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  className?: string;
  contentClassName?: string;
  gradient?: boolean;
  glassmorphism?: boolean;
  isLoading?: boolean;
}

const DashboardCard = React.forwardRef<HTMLDivElement, DashboardCardProps>(
  ({ 
    title, 
    description, 
    children, 
    className, 
    contentClassName,
    gradient = false,
    glassmorphism = false,
    isLoading = false,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border overflow-hidden transition-all duration-200",
          glassmorphism ? "glass-card" : "bg-card",
          gradient ? "p-[1px] bg-gradient-to-br from-border to-primary/20" : "border-border",
          isLoading ? "animate-pulse" : "",
          className
        )}
        {...props}
      >
        <div className={cn(
          "h-full w-full rounded-[calc(0.75rem-1px)]",
          glassmorphism ? "bg-transparent" : gradient ? "bg-card" : "",
          contentClassName
        )}>
          {(title || description) && (
            <div className="px-6 py-4 border-b">
              {title && <h3 className="font-medium">{title}</h3>}
              {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
          )}
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  }
);

DashboardCard.displayName = "DashboardCard";

export default DashboardCard;
