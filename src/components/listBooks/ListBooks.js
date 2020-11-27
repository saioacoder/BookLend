import getLiteral from '../literals';
import { getAuthors } from '../../logic/book';

import './ListBooks.scss';

const ListBooks = ({ list, updateBookSel, noResults }) => {

	const selectBook = e => {
		const allItems = document.querySelectorAll('.listBooks_item');
		allItems.forEach(item => {
			item.classList.remove('listBooks_item__sel');
		});

		const itemClicked = e.target;
		const itemSel = itemClicked.closest('.listBooks_item');
		itemSel.classList.add('listBooks_item__sel');
		updateBookSel(itemSel.id);
	}

	return (
		<>
			{!noResults ?
				<div className="listBooks">
					{list.map(({ volumeInfo }) => {
						const { title, imageLinks, authors, publishedDate, industryIdentifiers, language } = volumeInfo;
						const smallThumbnail = imageLinks ? imageLinks.smallThumbnail : '';
						const cleanTitle = title.replace(/\u00a0/g, ' ');
						const authorsList = getAuthors(authors);
						const publishedYear = publishedDate ? publishedDate.slice(0, 4) : '';
						const isbn13Item = industryIdentifiers ? industryIdentifiers.filter(item => item.type === 'ISBN_13') : [];
						const isbn = isbn13Item.length > 0 ? isbn13Item[0].identifier : '';
						if(isbn !== '') {
							return (
								<div
									key={isbn}
									id={isbn}
									onClick={selectBook}
									className="listBooks_item"
								>
									<img src={smallThumbnail} className="listBooks_image" alt="" />
									<div>
										<h3 className="listBooks_title">{cleanTitle}</h3>
										<p className="listBooks_author">{authorsList}</p>
										<p className="listBooks_other">{publishedYear} / {language}</p>
									</div>
								</div>
							);
						} else {
							return;
						}
					})}
				</div>
			:
				<div class="form_error">{getLiteral('error-no-results')}</div>
			}
		</>
	);

};

export default ListBooks;