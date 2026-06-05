from ._version import __version__


def _jupyter_labextension_paths():
    return [
        {
            "src": "labextension",
            "dest": "jupyter_rs_vtk",
        }
    ]


def _jupyter_nbextension_paths():
    return [
        {
            "section": "notebook",
            "src": "nbextension",
            "dest": "jupyter_rs_vtk",
            "require": "jupyter_rs_vtk/extension",
        }
    ]
