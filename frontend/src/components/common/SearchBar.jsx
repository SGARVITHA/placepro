import { Search } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  id = 'search-input',
  className = '',
}) {
  return (
    <div className={`relative w-full ${className}`}>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-text-secondary" />
      </div>
      <input
        type="text"
        id={id}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full pl-8 pr-3 py-1.5 bg-bg-primary border border-border rounded-pill text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
      />
    </div>
  );
}
