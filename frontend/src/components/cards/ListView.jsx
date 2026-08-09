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
  emptyMessage = 'No items found',
  className = '',
}) {
  const handleRenderItem = (item, index) => {
    if (renderItem) {
      return renderItem(item, index);
    }
    return <Card key={item.id || index} {...item} />;
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {onSearchChange && (
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
        />
      )}

      {isLoading ? (
        <LoadingState count={8} variant="card" />
      ) : error ? (
        <EmptyState message={typeof error === 'string' ? error : 'Failed to load items.'} />
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
