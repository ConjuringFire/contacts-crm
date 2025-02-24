import { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

interface SearchBarProps {
    onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div>
            <Search placeholder="Search" value={searchTerm} onChange={handleChange} onSearch={handleSearch} enterButton />
        </div>
    );
};

export default SearchBar;