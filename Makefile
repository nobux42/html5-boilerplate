deploy:
	npm run build
	mkdir -p public
	cp -R dist/* public/
