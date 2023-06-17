CREATE TABLE IF NOT EXISTS users (
	u_id serial primary key,
	user_name text not null unique,
	password text not null
);

CREATE TABLE IF NOT EXISTS products (
	p_id serial primary key,
	p_name text not null,
	p_description text,
	price integer not null
);

CREATE TABLE IF NOT EXISTS userbasket (
	cart_id serial primary key,
	u_id integer not null,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "fk_user_basket" FOREIGN KEY (u_id) REFERENCES users(u_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS basket (
	basket_item_id serial primary key,
	cart_id integer not null,
	product_id integer not null,
	quantity integer not null,
	CONSTRAINT "fk_basket" FOREIGN KEY (cart_id) REFERENCES userbasket(cart_id) ON DELETE SET NULL,
	CONSTRAINT "fk_basket_product" FOREIGN KEY (product_id) REFERENCES products(p_id) ON DELETE SET NULL
);
