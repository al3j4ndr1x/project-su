# Semantic Versioning 2.0.0

## Summary
Given a version number MAJOR.MINOR.PATCH, increment the:

1. MAJOR version when you make incompatible API changes,
2. MINOR version when you add functionality in a backwards-compatible manner, and
3. PATCH version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

## Strict Semantic Versioning Validation
The regular expression below is used to validate release version and may be for branch name (e.g: 2.5.x) too.

### Regular Expression (RegEx / RegExp)
```
^((([0-9]+)\.([0-9]+)\.(([x])|([0-9]+))(?:-([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)$ 
 ```

### Text

#### Valid TAG version and branch name for release
0.1.0-alpha.0

0.2.0-beta.1

2.5.x

4.3.5

2.0.0-rc.2

0.9.9-beta

1.0.0-alpha

8.1.4-stable

1.0.0-0.3.7

1.0.0-x.7.z.92

1.0.0-alpha+001

1.0.0+20130313144700

1.0.0-beta+exp.sha.5114f85

1.0.0-alpha.beta

1.0.0-beta.11

1.0.0-beta.99

#### Invalid, not minimal MAJOR.MINOR.PATCH format
1

1.1

#### Valid, meets minimal MAJOR.MINOR.PATCH
1.1.1

#### Pre-release form (paragraph 9 of specs)
1.0.0-alpha

1.0.0-alpha.1

1.0.0-0.3.7

1.0.0-x.7.z.92


#### build metadata immediately following the pre-release  (paragraph 10 of specs) 
1.0.0-alpha+001

#### build metadata immediately following the patch (paragraph 10 of specs)
1.0.0+20130313144700

#### build metadata immediately following the pre-release (paragraph 10 of specs)
1.0.0-beta+exp.sha.5114f85

#### invalid pre-release metadata (empty identifier[s], paragraph 9 of specs)
1.0.0-.123

1.0.0-...

1.0.0-123.

1.0.0-+

1.0.0-+123

1.0.0-

#### invalid build metadata (empty identifier[s], paragraph 10 of specs)
1.0.0+.123

1.0.0+...

1.0.0+123.

1.0.0+

conforms to http://semver.org/ specifications... or at least tries to...


Capture Groups:

1. The whole version string
2. MAJOR.MINOR.PATCH-PRE_RELEASE (what you should be evaluating for precendence)
3. MAJOR
4. MINOR
5. PATCH
6. PRERELEASE
7. BUILD_METADATA


# References

https://semver.org/

https://regexr.com/39s32
