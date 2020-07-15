
main  		= ./source/main.ts
permissions = --allow-run --allow-net --allow-read --allow-write
deno  		= deno run --unstable $(permissions)

debug:
	$(deno) $(main)

run:
	$(deno) --quiet --no-check $(main)
