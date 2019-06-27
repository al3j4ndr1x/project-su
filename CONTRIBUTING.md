# Contributing

 - [Workflow](#workflow)
 - [Coding Rules](#rules)
 - [Branching](#branching) 
 - [Commit Guidelines](#commit)

## <a name="workflow"></a> Workflow

This is a basic workflow and a quick reference for contributing code. 

## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

* All features or bug fixes **must be tested** by one or more specs (unit-tests or e2e-tests).
* All public API methods **must be documented**. (Details TBC).
* We follow [Google's JavaScript Style Guide][js-style-guide], but wrap all code at
  **100 characters**.

## <a name="branching"></a> Branching

### Quick reference

<table>
  <thead>
    <tr>
      <th>Branch</th>
      <th>Type</th>
      <th>State</th>
      <th>Comments</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>origin/master</td>
      <td>master branch</td>
      <td>production-ready</td>
      <td>The main branch. Accepts merges from develop, release, and hotfix.</td>
    </tr>
    <tr>
      <td>origin/develop</td>
      <td>integration branch</td>
      <td>ready for the "next release"</td>
      <td>The latest delivered development changes for the next release. Accepts merges from master, topic, and hotfix.</td>
    </tr>
    <tr>
      <td>release-*</td>
      <td>release branches</td>
      <td>production</td>
      <td>New production release. May branch off from: develop. Must merge back into: develop and master, and then tagged with a release number.</td>
    </tr>
    <tr>
      <td>topic-*</td>
      <td>feature branches</td>
      <td>local development</td>
      <td>May branch off from: develop. Must merge back into: develop.</td>
    </tr>
    <tr>
      <td>hotfix-*</td>
      <td>hotfix branches</td>
      <td>current release</td>
      <td>Severe bugs. May branch off from: master. Must merge back into: develop and master.</td>
    </tr>
  </tbody>
</table>

### The main branches

The central repository holds two main branches with an infinite lifetime:

* `master`
* `develop`

We consider `origin/master` to be the main branch where the source code of HEAD always reflects a _production-ready_ state.

We consider `origin/develop` to be the main branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release. Some would call this the "integration branch". This is where any automatic nightly builds are built from.

When the source code in the `develop` branch reaches a stable point and is ready to be released, all of the changes should be merged back into `master` somehow and then tagged with a release number.

Therefore, each time when changes are merged back into `master`, this is a new production release by definition.

### Release branches

Release branches support preparation of a new production release. 

Release branches are created from the develop branch. The state of develop is ready for the "next release". We branch off and give the release branch a name reflecting the new version number:

The key moment to branch off a new release branch from develop is when develop (almost) reflects the desired state of the new release. At least all features that are targeted for the release-to-be-built must be merged in to develop at this point in time. All features targeted at future releases may not—they must wait until after the release branch is branched off.

When the state of the release branch is ready to become a real release, some actions need to be carried out. First, the release branch is merged into master (since every commit on master is a new release by definition). Next, that commit on master must be tagged for easy future reference to this historical version. Finally, the changes made on the release branch need to be merged back into develop, so that future releases also contain these bug fixes.

### Feature branches

Feature branches (or sometimes called topic branches) are used to develop new features for the upcoming or a distant future release. 

The different types of branches we may use are:

* `feature`
* `issue`
* `bug`
* `experiment`

### Hotfix branches

Hotfix branches are very much like release branches in that they are also meant to prepare for a new production release, albeit unplanned. They arise from the necessity to act immediately upon an undesired state of a live production version. When a critical bug in a production version must be resolved immediately, a hotfix branch may be branched off from the corresponding tag on the master branch that marks the production version.

The essence is that work of team members (on the develop branch) can continue, while another person is preparing a quick production fix.

#### Creating the hotfix branch

Hotfix branches are created from the master branch. For example, say version 1.2 is the current production release running live and causing troubles due to a severe bug. But changes on develop are yet unstable. We may then branch off a hotfix branch and start fixing the problem:

```
```

Don’t forget to bump the version number after branching off!
Then, fix the bug and commit the fix in one or more separate commits.

```
```
#### Finishing a hotfix branch

When finished, the bugfix needs to be merged back into master, but also needs to be merged back into develop, in order to safeguard that the bugfix is included in the next release as well. This is completely similar to how release branches are finished.

First, update master and tag the release.

```
```

## <a name="commit"></a> Commit Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to more readable messages that are easy to follow when looking through the project history. 

### Commit Message Format

Each commit message consists of a header, a body and a footer. The header has a special format that includes a type, a scope and a subject:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier to read on GitHub as well as in various git tools.

The footer should contain a [closing reference to an issue](https://help.github.com/en/articles/closing-issues-using-keywords) if any.

#### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

#### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) [2]
- **ci**: Changes to our CI configuration files and - scripts (example scopes: Circle, BrowserStack, SauceLabs) [2]
- **docs**: Documentation only changes
- **feat**: A new feature [1]
- **fix**: A bug fix [1]
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
* **release**: A release commit. Must only include version changes. [2]
* **revert**: A git commit revert. The description must include the original commit message. [2]
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

<sup>[1] This type MUST have a scope. See the next section for more information.</sup><br/>
<sup>[2] This type MUST NOT have a scope. It only applies to general scripts and tooling.</sup>

#### Scope

The following is the list of supported scopes:

- **core**:
- **packaging**:
- **changelog**: used for updating the release notes in CHANGELOG.md

#### Subject

The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

#### Body

Just as in the subject, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior.

#### Footer

The footer should contain any information about Breaking Changes and is also the place to reference GitHub issues that this commit Closes.

Breaking Changes should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

## References

ref: [branching strategy](https://nvie.com/posts/a-successful-git-branching-model/)
