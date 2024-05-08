import React, { useState, useEffect } from 'react';
import "./RandomQuote.css";
import refreshbutton from './assets/refreshbutton.png';

export const RandomQuote = () => {
    const [quotes, setQuotes] = useState([]);
    const [quote, setQuote] = useState({
        text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
        author: "Abraham Lincoln"
    });
    const [searchAuthor, setSearchAuthor] = useState('');

    useEffect(() => {
        async function loadQuotes() {
            const response = await fetch('https://type.fit/api/quotes');
            const data = await response.json();
            setQuotes(data);
        }
        loadQuotes();
    }, []);

    const randomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    };

    const searchQuoteByAuthor = () => {
        const filteredQuotes = quotes.filter(q => q.author && q.author.toLowerCase().includes(searchAuthor.toLowerCase()));
        if (filteredQuotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
            setQuote(filteredQuotes[randomIndex]);
        } else {
            alert('No quotes found for the given author.');
        }
    };

    return (
        <div className="container">
            <div className="quote">{quote.text}</div>
            <div>
                <div className="line"></div>
                <div className="bottom">
                    <div className="author"> - {quote.author.split(',')[0]}</div>
                    <div className="icons">
                        <img src={refreshbutton} alt="" onClick={randomQuote} />
                    </div>
                </div>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Enter author name"
                    value={searchAuthor}
                    onChange={(e) => setSearchAuthor(e.target.value)}
                />
                <button onClick={searchQuoteByAuthor}>Search</button>
            </div>
        </div>
    );
};

export default RandomQuote;
