interface EmptyStateProps {
  icon: () => React.JSX.Element;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
      <div className="flex justify-center mb-4 text-gray-400">
        <div className="scale-150">
          <Icon />
        </div>
      </div>
      <h3 className="text-base font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
