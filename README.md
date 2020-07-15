
# GitGet

A little tiny tool to clone a whole GitLab server :)

## How to use
You should have [deno](https://deno.land) and GNU Make. Make yourself a `.env` file that has a private access token (with full access). The IP / URL of your GitLab. And a backup directory directory in your system so that it can clone there:

```
ACCESS_TOKEN = XXXXXXXXXXXXXXXXXXXX
GITLAB_IP = XXX.XXX.XXX.XXX
BACKUP_DIRECTORY = ~/somewhere
```

When the `.env` was made. Run `make run` and have it running :)
