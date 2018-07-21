using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class UIAnchor : MonoBehaviour {

	public float UIScale;
	public Transform UI,crosshair;

	private void Awake()
	{
		UI.SetParent(null);
		UI.transform.localScale = new Vector3(-UI.transform.localScale.x, UI.transform.localScale.y, UI.transform.localScale.z);
		
	}

	private void Update()
	{
		UI.transform.position = transform.position.normalized/ UIScale;
		UI.transform.LookAt(Vector3.zero - transform.position, Vector3.up);
		crosshair.transform.position = transform.parent.position;
	}
}
