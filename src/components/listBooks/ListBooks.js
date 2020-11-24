import './ListBooks.scss';

const ListBooks = ({ list, updateBookSel }) => {

	function getAuthors(authors) {
		return authors.map((item, i) => {
			if(i !== authors.length - 1 && authors.length > 1) {
				return `${item}, `;
			}
			return item;
		});
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
		<div className="listBooks">
			{list.map(({ id, volumeInfo }) => {
				const { title, imageLinks, authors, publishedDate } = volumeInfo;
				const { smallThumbnail } = imageLinks;
				const cleanTitle = title.replace(/\u00a0/g, ' ');
				const authorsList = getAuthors(authors);
				const publishYear = publishedDate.slice(0, 4);
				return (
					<div
						key={id}
						id={id}
						onClick={selectBook}
						className="listBooks_item"
					>
						<img src={smallThumbnail} className="listBooks_image" alt="" />
						<div>
							<h3 className="listBooks_title">{cleanTitle}</h3>
							<p className="listBooks_author">{authorsList}</p>
							<p className="listBooks_publishDate">{publishYear}</p>
						</div>
					</div>
				);
			})}
		</div>
	);

};

export default ListBooks;