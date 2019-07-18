# Gitflow

This is a quick reference for branching with git flow.

## The main branches

The central repository holds two main branches with an infinite lifetime:

* `master`
* `develop`

Each time when changes are merged back into `master`, this is a new production release _by definition_.

## Feature branches

Feature branches (or sometimes called **topic** branches) are used to develop new features for the upcoming or a distant future release. 

The different types of branches we may use are:

* `feature`
* `issue`
* `bug`
* `experiment`
* `docs`

**Remember**, before each _commit_, _merge_, _push_ or _pull request_ run tests and check if all passed.

<sup>If your branch includes more than one commit, do not merge with a fast-forward:</sup>
```bash
# ensures that a merge commit is created
$ git merge --no-ff my-branch
```
## Branching strategy

### `master` branch

#### Checkout to branch 'master' and pull from remote

```bash
git checkout master
git pull origin master
```

### `develop` branch

#### Checkout branch 'develop', Rebase and Push to remote

```bash
git checkout develop
git rebase master
git push origin develop
```

### `topic/feature` branch

#### Checkout a new branch 'myfeature' from 'develop'
```bash
git checkout -b myfeature develop
git commit -a
```
#### Checkout branch 'develop' and Rebase 'myfeature'
```bash
git checkout develop
git merge --no-ff myfeature
git push origin develop
```
<sup>If your branch includes more than one commit, do not merge with a fast-forward.</sup>
### `release` branch
If we are ready to release a new version, we create a new release branch.

#### Checkout a new branch '1.2.x' from 'develop'
```bash
git checkout -b 1.2.x develop
# Assign the new version in project files, then commit
git commit -a
git push -u origin 1.2.x
```

#### Pull Request (PR)
In **_Github_** compare and create a new pull request. Write a comment with version and topic issues ids, if apply.

#### Continuous Integration (CI)
Check if pass tests with **_CircleCI_**.

#### Merge and Commit with 'master'
Write a comment with the new version **1.2.0** assigned previously.

#### Release and Tag
In **_Github_**, create a new Release **1.2.0** and create a new Tag **1.2.0**, too.

#### Pull 'origin/master'
```bash
git checkout master
git pull origin master
git tag --list
```
#### Checkout 'develop' and Rebase
```shell
git checkout develop
git rebase master
git push origin develop
git log --graph --oneline --decorate
```

#### Delete local feature branch
```shell
git branch --delete myfeature
```

### `hotfix` branch

```bash
git checkout -b hotfix-1.2.1 master
$ ./bump-version.sh 1.2.1
git commit -a -m "Bumped version number to 1.2.1"
```

Don’t forget to bump the version number after branching off!

Then, fix the bug and commit the fix in one or more separate commits.

```bash
git commit -m "Fixed severe production problem"
```

#### Push 'hotfix-1.2.1' on remote
```bash
git push -u origin hotfix-1.2.1
```

#### Pull Request (PR)
In **_Github_**, compare and create a new pull request. Write a comment with version and bug/fix issue id.

#### Continuous Integration (CI)
Check if pass tests with **_CircleCI_**.

#### Merge and Commit with 'master'
Write a comment with the new version **1.2.1** assigned previously.

#### Release and Tag
In **_Github_**, create a new Release version **1.2.1** and Tag **1.2.1**.

#### Pull 'origin/master'
```bash
git checkout master
git pull origin master
git tag --list
```
#### Next, include the hotfix in `develop`, too:

```shell
git checkout develop
git rebase master
git push origin develop
git log --graph --oneline --decorate
```

#### Finally, remove the temporary branch:

```bash
git branch --delete hotfix-1.2.1
```

## git extras

### Reset local repository branch to be just like remote repository HEAD

If you want to save your current branch's state before doing this (just in case), you can do:
```bash
git commit -a -m "Saving my work, just in case"
git branch my-saved-work
```
Now your work is saved on the branch "my-saved-work" in case you decide you want it back (or want to look at it later or diff it against your updated branch).

Setting your branch to exactly match the remote branch can be done in two steps:
```bash
git fetch origin
git reset --hard origin/master
```

### Undo a git push

#### to undo a git push
```bash
git push -f origin HEAD^:master
```
#### to get to previous commit (preserves working tree)
```bash
git reset --soft HEAD
```
#### to get back to previous commit (you'll lose working tree)
```bash
git reset --hard HEAD^
```

### Fix the last commit message
**Scenario**: You just typo'd the last commit message, you did `git commit -m "Fxies bug #42"` but before `git push` you realized that really should say "Fixes bug #42".

**Undo with**: `git commit --amend` or `git commit --amend -m "Fixes bug #42"`

**What's happening**: `git commit --amend` will update and replace the most recent commit with a new commit that combines any staged changes with the contents of the previous commit. With nothing currently staged, this just rewrites the previous commit message.

### Add a new file, and stage it, to the last commit 
**Scenario**: I want to add or remove a file from the previous commit.
In order to remove changes for a file from the previous commit, do the following:

**Edit with**:
```shell
$ git checkout HEAD^ myfile # if remove a file
$ git add myfile
$ git commit --amend --no-edit
```

**What's happening**: `git commit --amend --no-edit` will update the previous commit with the new file. The `--no-edit` option is used to keep the existing commit message.

### Undo "local" changes

**Scenario**: The cat walked across the keyboard and somehow saved the changes, then crashed the editor. You haven't committed those changes, though. You want to undo everything in that file-just go back to the way it looked in the last commit.

**Undo with**: `git checkout -- <bad filename>`

**What's happening**: `git checkout` alters files in the working directory to a state previously known to Git. You could provide a branch name or specific SHA you want to go back to or, by default, Git will assume you want to checkout `HEAD`, the last commit on the currently-checked-out branch.

Keep in mind: any changes you "undo" this way are really gone. They were never committed, so Git can't help us recover them later. Be sure you know what you're throwing away here! (Maybe use `git diff` to confirm).

### Check GIT ignored files
`git ls-files --others --ignored --exclude-standard`

## References

1. [An overview of recommended workflows with Git](https://git-scm.com/docs/gitworkflows)
2. [Branching strategy](https://nvie.com/posts/a-successful-git-branching-model/)
3. https://github.com/agis/git-style-guide
4. https://es.atlassian.com/git/tutorials/merging-vs-rebasing
5. https://github.blog/2015-06-08-how-to-undo-almost-anything-with-git/
