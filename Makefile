
main  		= ./source/main.ts
deno  		= deno run -A

debug:
	$(deno) $(main)

run:
	$(deno) --quiet --no-check $(main)
