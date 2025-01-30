# RO-Crate Viewer

## Project Overview
The RO-Crate Viewer provides a graphical user interface to explore the contents of an ARC RO-Crate Meatadata JSON file. It is meant as a visualization tool and therefore does not allow any modifications on the data.

## Setup and Installation

For development purposes, first clone the repository:
```
git clone https://github.com/IPK-BIT/rocrate-viewer
```

Then install the project:
```
cd rocrate-viewer/
npm install
```

Finally, run a development web server.
```
npm run dev
```

## Usage Instructions
The web application is deployed on Github Pages. You can use this deployment on https://ipk-bit.github.io/rocrate-viewer/. The RO-Crate Viewer does not store or modify the uploaded information, but only visualizes the uploaded ARC RO-Crate Metadata JSON file. For detailed information see the [Additional Resources](#additional-resources) section.

## Features
- Visualize an uploaded ARC RO-Crate Metadata JSON File
- Provides a graphical user interface to explore the contents (or rather their metadata) of an ARC
- Tabs provide quick access to specific contents

## License
- The project is licensed under [MIT License](LICENSE)

## Additional Resources
- [RO-Crate](https://www.researchobject.org/ro-crate/)
- [ARC RO-Crate Specification](https://github.com/nfdi4plants/ARC-specification/blob/main/ARC%20specification.md#appendix-conversion-of-arcs-to-ro-crates)
- [ARC RO-Crate Profile](https://www.researchobject.org/ro-crate/profiles#arc-cwl-ro-crate-profile)