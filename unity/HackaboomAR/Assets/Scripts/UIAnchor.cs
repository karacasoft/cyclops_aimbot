using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class UIAnchor : MonoBehaviour {

	public float UIScale, epsilon;
	public Transform UI,crosshair;
	public Sprite red, green;
	private void Awake()
	{
		UI.SetParent(null);
		UI.transform.localScale = new Vector3(-UI.transform.localScale.x, UI.transform.localScale.y, UI.transform.localScale.z) / UIScale;
		
	}

	private void Update()
	{
		Vector2 markerScreenPoint = Camera.main.WorldToScreenPoint(transform.position)/*,normVec = (-markerScreenPoint + new Vector2(Screen.width /2, Screen.height / 2));
		markerScreenPoint = normVec.normalized * centerPush * Mathf.Log(normVec.magnitude,2) + markerScreenPoint*/;
		if (markerScreenPoint.x > Screen.width / 2)
			markerScreenPoint = markerScreenPoint + Vector2.left * Screen.width / 2;
		UI.transform.position = Camera.main.ScreenToWorldPoint(new Vector3(markerScreenPoint.x,markerScreenPoint.y,1));
		UI.transform.LookAt(Vector3.zero, Vector3.up);
		markerScreenPoint = Camera.main.WorldToScreenPoint(transform.parent.position);
		crosshair.transform.position = Camera.main.ScreenToWorldPoint(new Vector3(markerScreenPoint.x, markerScreenPoint.y, 1));
		if (Vector2.Distance(markerScreenPoint, new Vector2(Screen.width / 2, Screen.height / 2)) < epsilon)
			crosshair.GetComponent<SpriteRenderer>().sprite = green;
		else
			crosshair.GetComponent<SpriteRenderer>().sprite = red;
	}
}
