import React from 'react';
import SearchBar from '../common/SearchBar';
import LoadingState from '../common/LoadingState';
import EmptyState from '../common/EmptyState';
import Card from './Card';

export default function ListView({
  items = [],
  renderItem,
  searchPlaceholder = 'Search items...',
  searchValue,
  onSearchChange,
  isLoading = false,
  error = null,
  onRetry,
  emptyMessage = 'No items found',
  className = '',
}) {
  const handleRenderItem = (item, index) => {
    if (renderItem) {
      return renderItem(item, index);
    }
    return <Card key={item.id || index} {...item} />;
  };

  const handleSearchInputChange = (e) => {
    if (!onSearchChange) return;
    const value = typeof e === 'string' ? e : e.target?.value ?? e;
    onSearchChange(value);
  };

  const errorMessage = error
    ? typeof error === 'string'
      ? error
      : error.message || "Couldn't load items."
    : null;

  return (
    <div className={`space-y-3 ${className}`}>
      {onSearchChange && (
        <SearchBar
          value={searchValue}
          onChange={handleSearchInputChange}
          placeholder={searchPlaceholder}
        />
      )}

      {isLoading ? (
        <LoadingState count={8} variant="card" />
      ) : error ? (
        <EmptyState
          message={errorMessage}
          actionLabel="Retry"
          onAction={onRetry || (() => window.location.reload())}
        />
      ) : items.length === 0 ? (
        <EmptyState message={emptyMessage} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {items.map((item, index) => handleRenderItem(item, index))}
        </div>
      )}
    </div>
  );
}

