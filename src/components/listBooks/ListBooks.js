import getLiteral from '../literals';

import './ListBooks.scss';

const ListBooks = ({ list, updateBookSel, noResults }) => {

	function getAuthors(authors) {
		if(authors) {
			return authors.map((item, i) => {
				if(i !== authors.length - 1 && authors.length > 1) {
					return `${item}, `;
				}
				return item;
			});
		} else {
			return '';
		}
	}

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
						const { title, imageLinks, authors, publishedDate, industryIdentifiers } = volumeInfo;
						const smallThumbnail = imageLinks ? imageLinks.smallThumbnail : '';
						const cleanTitle = title.replace(/\u00a0/g, ' ');
						const authorsList = getAuthors(authors);
						const publishedYear = publishedDate ? publishedDate.slice(0, 4) : '';
						const isbn = industryIdentifiers ? industryIdentifiers[0].identifier : '';

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
									<p className="listBooks_publishDate">{publishedYear}</p>
								</div>
							</div>
						);
					})}
				</div>
			:
				<div class="form_error">{getLiteral('error-no-results')}</div>
			}
		</>
	);

};

export default ListBooks;